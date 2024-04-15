class Stakeholder < ApplicationRecord
  belongs_to :project
  validates :title, :name, :contact, presence: true
end
