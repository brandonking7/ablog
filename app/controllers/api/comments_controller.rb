class Api::CommentsController < ApplicationController
  before_action :find_post
  # def index
  #   post = Post.find(params[:post_id])
  #   # post = Post.where(post_id: post.id)
  #   @comments = post.comments.all
  #
  #   render json: @comments
  # end

  def show

  end

  def create
    @comment = Comment.find(params[:id])

    render json: @comment
  end

  def destroy

  end

  private

  def find_post
    @post = Post.find(params[:id])
  end

end
