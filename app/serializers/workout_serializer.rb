class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :warmup, :cooldown, :duration, :video_url, :tags, :user_id
  has_one :user
end
