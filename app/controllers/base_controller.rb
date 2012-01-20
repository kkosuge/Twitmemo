class BaseController < ApplicationController
  def index
    @memos = Memo.order("updated_at DESC")
  end
end
