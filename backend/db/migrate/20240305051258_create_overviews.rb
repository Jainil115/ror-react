class CreateOverviews < ActiveRecord::Migration[7.1]
  def change
    create_table :overviews do |t|
      t.references :project, null: false, foreign_key: true
      t.text :project_overview
      t.text :purpose
      t.text :goals
      t.text :objectives
      t.decimal :budget

      t.timestamps
    end
  end
end
