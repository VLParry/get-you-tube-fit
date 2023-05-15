# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |i|
    User.create(
      name: "User #{i+1}",
      email: "user#{i+1}@example.com",
      password_digest: "password"
    )
  end


# Workout.create(title: "Bodyweight Cardio Workout with High and Low Impact Modifications", description: "I found this to be an excellent workout", warmup: true, cooldown: true, duration: 30, video_url: "https://www.youtube.com/watch?v=5mCcUndJMo8&t=916s", user_id: 1)

# Workout.create(title: "HIIT Workout", description: "A high-intensity interval training routine for a full-body workout",warmup: true, cooldown: true, duration: 45, video_url: "https://www.youtube.com/watch?v=ml6cT4AZdqI", user_id: 2)

# Workout.create(title: "Cardio Kickboxing Workout", description: "25 Minute Kickboxing Cardio Interval Workout", warmup: true, cooldown: true, duration: 25, video_url: "https://www.youtube.com/watch?v=Vve4BVTZ0QU", user_id: 1)


# Tag.create(name: "Cardio")
# Tag.create(name: 'Strength')
# Tag.create(name: 'Yoga')
# Tag.create(name: 'HIIT')
# Tag.create(name: 'Stretching')
# Tag.create(name: 'Weights')
# Tag.create(name: 'No Equipment')
# Tag.create(name: 'Easy')
# Tag.create(name: 'Difficult')

# Create tags
tag_cardio = Tag.create!(name: 'Cardio')
tag_strength = Tag.create!(name: 'Strength')
tag_yoga = Tag.create!(name: 'Yoga')
tag_hiit = Tag.create!(name: 'HIIT')
tag_stretching = Tag.create!(name: 'Stretching')
tag_weights = Tag.create!(name: 'Weights')
tag_no_equipment = Tag.create!(name: 'No Equipment')
tag_easy = Tag.create!(name: 'Easy')
tag_difficult = Tag.create!(name: 'Difficult')

# Create workouts
workout1 = Workout.create!(title: "Bodyweight Cardio Workout with High and Low Impact Modifications", description: "I found this to be an excellent workout", warmup: true, cooldown: true, duration: 30, video_url: "https://www.youtube.com/watch?v=5mCcUndJMo8&t=916s", user_id: 1)
workout2 = Workout.create!(title: "HIIT Workout", description: "A high-intensity interval training routine for a full-body workout",warmup: true, cooldown: true, duration: 45, video_url: "https://www.youtube.com/watch?v=ml6cT4AZdqI", user_id: 2)
workout3 = Workout.create!(title: "Cardio Kickboxing Workout", description: "25 Minute Kickboxing Cardio Interval Workout", warmup: true, cooldown: true, duration: 25, video_url: "https://www.youtube.com/watch?v=Vve4BVTZ0QU", user_id: 1)




# Associate tags with workouts
WorkoutTag.create!(workout: workout1, tag: tag_cardio)
WorkoutTag.create!(workout: workout1, tag: tag_no_equipment)
WorkoutTag.create!(workout: workout2, tag: tag_hiit)
WorkoutTag.create!(workout: workout2, tag: tag_strength)
WorkoutTag.create!(workout: workout3, tag: tag_cardio)
WorkoutTag.create!(workout: workout3, tag: tag_easy)
