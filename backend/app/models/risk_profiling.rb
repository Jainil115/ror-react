class RiskProfiling < ApplicationRecord
  belongs_to :project
  validates :risk_type, :description, :severity, :impact, :remedial_steps, :status, :closure_date, presence: true
end
