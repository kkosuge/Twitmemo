class FavController < ApplicationController
  # api/fav
  def favorite
  # return redirect_to '/404.html' unless request.xhr?
    @fav = fav.find_by_memo_id(params[:memo_id]) || create_fav(memo_id: params[:memo_id])
    
    if @fav
      @fav.destroy
    else
      @fav = Fav.new(memo_id: params[:memo_id], fav_user_id: session[:user_id], fav_screen_name:session[:screen_name])
    end

    respond_to do |format|
      if @memo.save
        format.json { render json: @fav, status: :created, location: @fav}
      else
        format.json { render json: @fav.errors, status: :unprocessable_entity}
      end
    end
  end
end
