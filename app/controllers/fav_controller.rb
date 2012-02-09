class FavController < ApplicationController
  def favorite
    return redirect_to '/404.html' unless request.xhr?
    @fav = Fav.where(memo_id: params[:memo_id],fav_user_id:session[:user_id]).first
    @memo = Memo.find(params[:memo_id])

    if @fav 
      @fav.destroy
      @memo.fav_flag = 0
    else
      @fav = Fav.new(memo_id: params[:memo_id], fav_user_id: session[:user_id], fav_screen_name:session[:screen_name])
      @memo.fav_flag = 1 
    end

    @memo.save
    respond_to do |format|
      if @fav.save
        format.json { render json: @fav, status: :created}
      else
        format.json { render json: @fav.errors, status: :unprocessable_entity}
      end
    end
  end

  def index
    fav = Fav.where(fav_user_id: session[:user_id]).map{|fav| fav.memo_id}
    @memos = Memo.where("id in (?)", fav)
  end
end
