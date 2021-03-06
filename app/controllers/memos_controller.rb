#coding:UTF-8
class MemosController < ApplicationController
  # GET /root
  def index
    if current_user
      if params[:keyword].present?
        @memos = Memo.where(author: session[:twitter_id]).keyword_search(params[:keyword]).page(params[:page])
      else
        @memos = Memo.where(author: session[:twitter_id]).order("updated_at DESC").page(params[:page]).per(20)
      end
    else
      @users = User.order("updated_at DESC").limit(14)
      @recentmemos = Memo.order("updated_at DESC").where(flag: 1).limit(2)
      render 'before_oauth'
    end
  end

  # GET /api/memos/:screen_name
  def search
    @memo = Memo.where(name: params[:screen_name] , author: session[:twitter_id])
    render json: @memo
  end

  def create_twitter_user(hash)
    user = twitter_client.user(hash[:screen_name])
    raise unless user
    @twitter = TwitterUser.new(twitter_id:user.id , screen_name: hash[:screen_name], img_url: user.profile_image_url)
    @twitter.save!
    return @twitter
  end

  # POST /api/post.json
  def create
    if request.referer
      return redirect_to '/404.html' unless request.xhr?
    end

    @twitter = TwitterUser.find_by_screen_name(params[:name]) || create_twitter_user(screen_name: params[:name])
    @memo = Memo.where(twitter_user_id: @twitter.id, author: session[:twitter_id]).first
    
    if @memo
      @memo.note = params[:note]
      @memo.flag = params[:flag]
    else
      @memo = Memo.new(name: @twitter.screen_name, note: params[:note], author_screen_name: session[:screen_name], twitter_user_id: @twitter.id, flag: params[:flag], author: session[:twitter_id])
    end

    if params[:post].to_i == 1
      twitter_client.update(".@#{@twitter.screen_name}さんへのメモを追加! #{user_url(:screen_name => @twitter.screen_name)} #twitmemo")
    end

    respond_to do |format|
      if @memo.save
        format.json { render json: @memo, status: :created, location: @memo}
      else
        format.json { render json: @memo.errors, status: :unprocessable_entity}
      end
    end
  end

  # POST /api/check.json
  def check
    if @current_user
      render json: {status: 1, token: session[:_csrf_token]}
    else
      render json: {status: 0}
    end
  end

  # DELETE /memos/1
  def destroy
    @memo = Memo.find(params[:id])
    @screen_name = @memo.name
    @memo.destroy
  end
end
