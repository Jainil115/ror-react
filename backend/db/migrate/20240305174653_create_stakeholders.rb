class CreateStakeholders < ActiveRecord::Migration[7.1]
  def change
    create_table :stakeholders do |t|
      t.string :title
      t.string :name
      t.string :contact
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
