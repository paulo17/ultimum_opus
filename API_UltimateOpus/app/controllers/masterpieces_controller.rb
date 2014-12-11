class MasterpiecesController < ApplicationController
  #http_basic_authenticate_with name: "admin", password: "adminopus", except: [:index, :show]

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
    @masterpiece = Masterpiece.new(params[:masterpiece].permit(:titre, :lieu, :auteur, :date, :courant, :son, :image, :localisation))
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
    @masterpiece = Masterpiece.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @masterpiece}
    end
  end

  def destroy
    @masterpiece = Masterpiece.find(params[:id])
    @masterpiece.destroy

    redirect_to masterpieces_path
  end

  private
  def masterpiece_params
    params.require(:masterpiece).permit(:titre, :lieu, :auteur, :date, :courant, :son, :image, :localisation)
  end

end