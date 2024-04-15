# app/controllers/email_update_controller.rb
#path for the call
class Api::V1::EmailUpdateController < ApplicationController
    def send_audit_history_email
      project = Project.find(params[:project_id])
      audit_histories = project.audit_histories
  
      stakeholders = project.stakeholders
      stakeholders.each do |stakeholder|
        AuditHistoryMailer.notify_stakeholder(stakeholder.contact, stakeholder.name, audit_histories).deliver_now
      end
  
      render json: { message: "Audit history email sent successfully" }
    end
  end
  