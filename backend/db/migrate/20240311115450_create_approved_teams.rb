class CreateApprovedTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :approved_teams do |t|
      t.references :project, null: false, foreign_key: true
      t.integer :number_of_resources
      t.string :role
      t.integer :availability_percentage
      t.string :duration

      t.timestamps
    end
  end
end
