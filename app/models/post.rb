class Post < ApplicationRecord
  # has_many :comments, dependent: :destroy
  # belongs_to :user
  has_many :comments, as: :commentable, dependent: :destroy
  belongs_to :user
end
