class MasterpiecesController < ApplicationController
	before_filter :restrict_access
	respond_to :json

	def new
		@masterpiece = Masterpiece.new
	end

	def index
		@masterpieces = Masterpiece.all

		respond_to do |format|
			format.html
			format.json { render json: @masterpieces}
		end
	end

	def create
		@masterpiece = Masterpiece.new(params[:masterpiece].permit(:titre, :date, :text, :image, :image2, :image3, :video))
		if params[:masterpiece][:image]
			@masterpiece.image = uploadImage(params[:masterpiece][:image])
			@masterpiece.image2 = uploadImage(params[:masterpiece][:image2])
			@masterpiece.image3 = uploadImage(params[:masterpiece][:image3])
		end
		if @masterpiece.save
			redirect_to @masterpiece
		else
			render 'new'
		end
	end

	def edit
		@masterpiece = Masterpiece.find(params[:id])
	end

	def update
		@masterpiece = Masterpiece.find(params[:id])

		if @masterpiece.update(masterpiece_params)
			redirect_to @masterpiece
		else
			render 'edit'
		end
	end

	def show
		if Masterpiece.exists?(:id => params[:id])
			@masterpiece = Masterpiece.find(params[:id])
			respond_to do |format|
				format.html
				format.json { render json: @masterpiece}
			end
		else
			self.send_error
		end
	end

	def destroy
		@masterpiece = Masterpiece.find(params[:id])
		@masterpiece.destroy

		redirect_to masterpieces_path
	end

	private
	def uploadImage(image)
		uploaded_io = image
		File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
			file.write(uploaded_io.read)
			@image_path = '/uploads/' + uploaded_io.original_filename
		end
		return @image_path
	end

	private
	def masterpiece_params
		params.require(:masterpiece).permit(:titre, :date, :text, :image, :image2, :image3, :video)
	end

	private
	def restrict_access
		@request = request.fullpath
		if @request.match(".json")
  		# access token
  		#authenticate_or_request_with_http_token do |token, options|
  			#ApiKey.exists?(access_token: token)
  		#end
  	else
  		# basic authenticate
  		authenticate_or_request_with_http_basic do |username, password|
  			username == "admin" && password == "adminopus"
  		end if Rails.env.production?
  	end
  end

end
