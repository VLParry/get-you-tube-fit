class CreateWorkoutTags < ActiveRecord::Migration[6.1]
  def change
    create_table :workout_tags do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :workout, null: false, foreign_key: true

      t.timestamps
    end
  end
end
