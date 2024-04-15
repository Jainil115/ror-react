class CreateProjectUpdates < ActiveRecord::Migration[7.1]
  def change
    create_table :project_updates do |t|
      t.date :date
      t.text :general_updates
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
