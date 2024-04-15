class CreateMomsOfClientMeetings < ActiveRecord::Migration[7.1]
  def change
    create_table :moms_of_client_meetings do |t|
      t.date :date
      t.integer :duration
      t.string :mom_link
      t.text :comments
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
