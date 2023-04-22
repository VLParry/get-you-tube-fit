class WorkoutTagSerializer < ActiveModel::Serializer
  attributes :id
  has_one :tag
  has_one :workout
end
