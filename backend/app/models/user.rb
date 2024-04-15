# app/models/user.rb

class User < ApplicationRecord
    # enum role: [:client, :admin, :auditor, :project_manager] # Assuming you have predefined roles 'client' and 'admin'
    
    # Callback to set the default role to 'client' when a new User is created
    after_initialize :set_default_role, if: :new_record?
  
    validates :email, presence: true, uniqueness: true
  
    private
  
    def set_default_role
      self.role ||= :client
    end
  end
  