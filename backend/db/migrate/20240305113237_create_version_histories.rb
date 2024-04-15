class CreateVersionHistories < ActiveRecord::Migration[7.1]
  def change
    create_table :version_histories do |t|
      t.string :version_no
      t.string :version_type
      t.text :change
      t.text :reason
      t.string :created_by
      t.date :revision_date
      t.date :approve_date
      t.string :approved_by
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end



