class CardsController < ApplicationController
  http_basic_authenticate_with name: "admin", password: "adminopus", only: :destroy
  def create
    @masterpiece = Masterpiece.find(params[:masterpiece_id])
    @card = @masterpiece.cards.create(card_params)
    redirect_to masterpiece_path(@masterpiece)
  end

  def index
    if params[:zone_id]
      @cards = Card.where("masterpiece_id = ?", params[:masterpiece_id])
      respond_to do |format|
        format.json { render json: @cards}
      end

    else
      @cards = Card.all
      respond_to do |format|
        format.json { render json: @cards}
      end
    end
  end

  def destroy
    @masterpiece = Masterpiece.find(params[:masterpiece_id])
    @card = @masterpiece.cards.find(params[:id])
    @card.destroy
    redirect_to masterpiece_path(@masterpiece)
  end

  private
  def card_params
    params.require(:card).permit(:caracteristique,:titre_contenu, :content)
  end
end
