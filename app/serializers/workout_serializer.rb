class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :warmup, :cooldown, :duration, :video_url, :tags
  has_one :user
end
