class CreateSprintDetails < ActiveRecord::Migration[7.1]
  def change
    create_table :sprint_details do |t|
      t.string :sprint
      t.date :start_date
      t.date :end_date
      t.string :status
      t.text :comments
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
