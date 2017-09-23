class Api::PostsController < ApplicationController
  protect_from_forgery with: :exception
  before_action :authenticate_user!, :except => [:index, :show]

  # GET /api/posts
  def index
    @posts = Post.all

    render json: @posts.to_json(include: [:user])
    # render json: @jobs.to_json(include: [:location, :jobseeker])
  end

  def show
    @post = Post.find(params[:id])

    # render json: @post.to_json(include: [:comments])

    # Working Version Of inlcuding nested relationships
    render json: @post.to_json(include: {comments: {include: :comments}})

    # konata.to_json(:include => { :posts => {
    #                              :include => { :comments => {
    #                                            :only => :body } },
    #                              :only => :title } })

    # post = Post.find(params[:id])
    # post = Post.where(post_id: post.id)
    # @post = post.comments.all
    #
    # render json: @post

  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end

  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      render json: @post, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: '', status: :no_content
  end

  private

  def post_params
    params.require(:post)
          .permit(:title, :content)
          .merge(user_id: current_user.id)
  end
end
