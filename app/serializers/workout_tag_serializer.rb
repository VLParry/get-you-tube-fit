class WorkoutTagSerializer < ActiveModel::Serializer
  attributes :id, :workout_id, :workout_title
  has_one :tag
  # has_one :workout

  def workout_id
    object.workout.id
  end

  def workout_title
    object.workout.title
  end
end
