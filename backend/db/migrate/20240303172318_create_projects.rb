class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.string :project_name
      t.string :project_desc
      t.string :project_scope
      t.string :project_stack
      t.string :project_status, default: "In progress"
      t.string :project_manager,default: "Dipa majumdar"

      t.timestamps
    end
  end
end
