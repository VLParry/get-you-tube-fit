class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.boolean :warmup
      t.boolean :cooldown
      t.integer :duration
      t.string :video_url

      t.timestamps
    end
  end
end

