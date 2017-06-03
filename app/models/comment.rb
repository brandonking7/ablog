class Comment < ApplicationRecord
  belongs_to :posts, dependent: :destroy
end
