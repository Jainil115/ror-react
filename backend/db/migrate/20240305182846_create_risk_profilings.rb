class CreateRiskProfilings < ActiveRecord::Migration[7.1]
  def change
    create_table :risk_profilings do |t|
      t.string :risk_type
      t.text :description
      t.string :severity
      t.string :impact
      t.text :remedial_steps
      t.string :status
      t.date :closure_date
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
