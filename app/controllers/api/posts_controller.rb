class Api::PostsController < ApplicationController
  # GET /api/posts
  def index
    @posts = Post.all

    render json: @posts.to_json(include: [:user])
    # render json: @jobs.to_json(include: [:location, :jobseeker])
  end

  def show
    @post = Post.find(params[:id])

    render json: @post.to_json(include: [:comments])

    # post = Post.find(params[:id])
    # post = Post.where(post_id: post.id)
    # @post = post.comments.all
    #
    # render json: @post

  end
end
