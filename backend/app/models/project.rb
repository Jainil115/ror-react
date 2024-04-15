class Project < ApplicationRecord
    has_many :overviews
    has_many :audit_histories
    has_many :version_histories
    has_many :stakeholders
    has_many :risk_profilings
    has_many :sprint_details
    has_many :phases
    has_many :operational_escalations
    has_many :financial_escalations
    has_many :technical_escalations
    has_many :approved_teams
    has_many :resources
    has_many :client_feedbacks
    has_many :project_updates
    has_many :moms_of_client_meetings
end
