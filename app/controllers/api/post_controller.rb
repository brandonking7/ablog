class Api::NotesController < ApplicationController
  # GET /api/posts
  def index
    @posts = Post.all

    render json: @posts
  end
end
