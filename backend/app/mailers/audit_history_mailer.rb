# app/mailers/audit_history_mailer.rb
class AuditHistoryMailer < ApplicationMailer
  def notify_stakeholder(email, name, audit_histories)
    @audit_histories = audit_histories
    @stakeholder_name = name
    mail(to: email, subject: "Audit History Update")
  end
end
