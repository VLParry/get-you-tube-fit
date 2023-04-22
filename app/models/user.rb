class User < ApplicationRecord
    has_secure_password 
    has_many :workouts

    validates :email, presence: true, uniqueness: true
end
