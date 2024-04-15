class CreateResources < ActiveRecord::Migration[7.1]
  def change
    create_table :resources do |t|
      t.string :resource_name
      t.string :role
      t.date :start_date
      t.date :end_date
      t.text :comment
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
