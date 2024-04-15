class CreateAuditHistories < ActiveRecord::Migration[7.1]
  def change
    create_table :audit_histories do |t|
      t.date :date
      t.string :reviewed_by
      t.string :status
      t.text :reviewed_section
      t.text :queries
      t.text :action_item
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
