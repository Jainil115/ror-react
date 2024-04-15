class CreatePhases < ActiveRecord::Migration[7.1]
  def change
    create_table :phases do |t|
      t.string :title
      t.date :start_date
      t.date :completion_date
      t.date :approval_date
      t.string :status
      t.date :revised_completion_date
      t.text :comments
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
