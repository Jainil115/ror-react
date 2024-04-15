class CreateClientFeedbacks < ActiveRecord::Migration[7.1]
  def change
    create_table :client_feedbacks do |t|
      t.string :feedback_type
      t.date :date_received
      t.text :detailed_feedback
      t.text :action_taken
      t.date :closure_date
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
