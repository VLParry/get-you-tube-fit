class WorkoutTagSerializer < ActiveModel::Serializer
  attributes :id, :workout_id, :workout_title
  has_one :tag
  has_one :workout
  # trying to figure out why my editing of tags associated to the workout is not working!

  def workout_id
    object.workout.id
  end

  def workout_title
    object.workout.title
  end


  # including these methods in the serializer, when you serialize a WorkoutTag object, the resulting JSON or other serialized format will contain the id and title attributes of the associated workout object, along with the other attributes specified in the attributes list of the serializer.
end
