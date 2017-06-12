class Api::CommentsController < ApplicationController
  before_action :find_commentable
  def index
    post = Post.find(params[:post_id])
    # post = Post.where(post_id: post.id)
    @comments = post.comments.all

    render json: @comments
  end

  def show

  end

  def new

  end

  def create
    @comment = @commentable.comments.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render json: @comment, status: :ok
    else
      render json: @comment, status: :unprocessable_entity
    end

  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: '', status: :no_content
  end

  private

  def comment_params
   params.require(:comment).permit(:message).merge(user_id: current_user.id)
  end

  def find_commentable
   @commentable = Comment.find_by_id(params[:comment_id]) if params[:comment_id]
   @commentable = Post.find_by_id(params[:post_id]) if params[:post_id]
  end

end
