class MemosController < ApplicationController
  # GET /memos
  def index
    if params[:keyword].present?
      @memos = Memo.keyword_search(params[:keyword]).page(params[:page])
    else
      @memos = Memo.where(author: session[:twitter_id]).order("updated_at DESC").page(params[:page]).per(10)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @memos }
    end
  end

  # GET /memos/1
  def show
    @memo = Memo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @memo }
    end
  end

  def create_twitter_user(hash)
    user = twitter_client.user(hash[:screen_name])
    @twitter = TwitterUser.new(twitter_id:user.id , screen_name: hash[:screen_name], img_url: user.profile_image_url)
    @twitter.save!
    return @twitter
  end

  # POST /api/post.json
  def create
    return redirect_to '/404.html' unless request.xhr?
    @twitter = TwitterUser.find_by_screen_name(params[:name]) || create_twitter_user(screen_name: params[:name])
    @memo = Memo.where(twitter_user_id: @twitter.id, author: session[:twitter_id]).first
    
    if @memo
      @memo.note = params[:note]
      @memo.flag = params[:flag]
    else
      @memo = Memo.new(name: @twitter.screen_name, note: params[:note], twitter_user_id: @twitter.id, flag: params[:flag], author: session[:twitter_id])
    end

    respond_to do |format|
      if @memo.save
        format.html { redirect_to @memo, notice: 'Memo was successfully created.' }
        format.json { render json: @memo, status: :created, location: @memo}
      else
        format.html { render action: "new" }
        format.json { render json: @memo.errors, status: :unprocessable_entity}
      end
    end
  end

  # PUT /memos/1
  # PUT /memos/1.json
  def update
    @memo = Memo.find(params[:id])

    respond_to do |format|
      if @memo.update_attributes(params[:memo])
        format.html { redirect_to @memo, notice: 'Memo was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @memo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /memos/1
  # DELETE /memos/1.json
  def destroy
    @memo = Memo.find(params[:id])
    @memo.destroy

    respond_to do |format|
      format.html { redirect_to memos_path }
      format.json { head :ok }
    end
  end
end
