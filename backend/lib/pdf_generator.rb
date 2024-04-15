# lib/pdf_generator.rb
require 'prawn'
require 'prawn/table'

class PdfGenerator
  def self.generate_pdf
    Prawn::Document.generate('project.pdf', page_size: 'A4', margin: [20, 50]) do |pdf|
      pdf.text 'Project Details', align: :center, size: 16, style: :bold
      pdf.move_down 20

      # Fetch data from the database for all types of escalations
      technical_escalations = TechnicalEscalation.all
      financial_escalations = FinancialEscalation.all
      operational_escalations = OperationalEscalation.all

      # Fetch data from the database for projects, clients, audit histories, version histories, overviews, stakeholders, risk profilings, and phases
      projects = Project.all
      clients = Client.all
      audit_histories = AuditHistory.all
      version_histories = VersionHistory.all
      overviews = Overview.all
      stakeholders = Stakeholder.all
      risk_profilings = RiskProfiling.all
      phases = Phase.all
      
      # Fetch data from the database for sprint details
      sprint_details = SprintDetail.all

      # Fetch data from the database for approved teams, resources, client feedbacks, project updates, and minutes of meetings
      approved_teams = ApprovedTeam.all
      resources = Resource.all
      client_feedbacks = ClientFeedback.all
      project_updates = ProjectUpdate.all
      # Fetch data from the database for moms of client meetings
      moms_of_client_meetings = MomsOfClientMeeting.all

      # Define table data and styles for technical escalations
      technical_table_data = generate_table_data(technical_escalations)

      # Define table data and styles for financial escalations
      financial_table_data = generate_table_data(financial_escalations)

      # Define table data and styles for operational escalations
      operational_table_data = generate_table_data(operational_escalations)

      # Define table data and styles for projects
      project_table_data = generate_project_table_data(projects)

      # Define table data and styles for clients
      client_table_data = generate_client_table_data(clients)

      # Define table data and styles for audit histories
      audit_table_data = generate_audit_table_data(audit_histories)

      # Define table data and styles for version histories
      version_table_data = generate_version_table_data(version_histories)

      # Define table data and styles for overviews
      overview_table_data = generate_overview_table_data(overviews)

      # Define table data and styles for stakeholders
      stakeholder_table_data = generate_stakeholder_table_data(stakeholders)

      # Define table data and styles for risk profilings
      risk_profiling_table_data = generate_risk_profiling_table_data(risk_profilings)

      # Define table data and styles for phases
      phase_table_data = generate_phase_table_data(phases)

      # Define table data and styles for sprint details
      sprint_detail_table_data = generate_sprint_detail_table_data(sprint_details)

       # Define table data and styles for approved teams
       approved_teams_table_data = generate_approved_teams_table_data(approved_teams)

       # Define table data and styles for resources
       resources_table_data = generate_resources_table_data(resources)
 
       # Define table data and styles for client feedbacks
       client_feedbacks_table_data = generate_client_feedbacks_table_data(client_feedbacks)
 
       # Define table data and styles for project updates
       project_updates_table_data = generate_project_updates_table_data(project_updates)
 
      # Define table data and styles for moms of client meetings
      moms_of_client_meetings_table_data = generate_moms_of_client_meetings_table_data(moms_of_client_meetings)

      # Define table options and styles for all escalations, projects, audit histories, version histories, overviews, stakeholders, risk profilings, phases, and sprint details
      table_options = {
        header: true,
        cell_style: { padding: 5, border_width: 1, size: 10 },
        # column_widths: { 0 => 50, 1 => 50 }, # Adjust column widths as needed
        row_colors: ['FFFFFF', 'DDDDDD']
      }

      # Draw the table for technical escalations
      draw_table(pdf, technical_table_data, 'Technical Escalations', table_options)

      # Draw the table for financial escalations
      draw_table(pdf, financial_table_data, 'Financial Escalations', table_options)

      # Draw the table for operational escalations
      draw_table(pdf, operational_table_data, 'Operational Escalations', table_options)

      # Draw the table for projects
      draw_table(pdf, project_table_data, 'Projects', table_options)

      # Draw the table for clients
      draw_table(pdf, client_table_data, 'Clients', table_options)

      # Draw the table for audit histories
      draw_table(pdf, audit_table_data, 'Audit Histories', table_options)

      # Draw the table for version histories
      draw_table(pdf, version_table_data, 'Version Histories', table_options)

      # Draw the table for overviews
      draw_table(pdf, overview_table_data, 'Overviews', table_options)

      # Draw the table for stakeholders
      draw_table(pdf, stakeholder_table_data, 'Stakeholders', table_options)

      # Draw the table for risk profilings
      draw_table(pdf, risk_profiling_table_data, 'Risk Profilings', table_options)

      # Draw the table for phases
      draw_table(pdf, phase_table_data, 'Phases', table_options)

      # Draw the table for sprint details
      draw_table(pdf, sprint_detail_table_data, 'Sprint Details', table_options)

      # Draw tables
      draw_table(pdf, approved_teams_table_data, 'Approved Teams', table_options)
      draw_table(pdf, resources_table_data, 'Resources', table_options)
      draw_table(pdf, client_feedbacks_table_data, 'Client Feedbacks', table_options)
      draw_table(pdf, project_updates_table_data, 'Project Updates', table_options)
      draw_table(pdf, moms_of_client_meetings_table_data, 'Moms of Client Meetings', table_options)

      
    end
  end

  private

  def self.generate_table_data(escalations)
    table_data = [['Escalation Level', 'Name']]
    escalations.each { |escalation| table_data << [escalation.escalation_level, escalation.name] }
    table_data
  end

  def self.generate_project_table_data(projects)
    table_data = [['Project Name', 'Project Description', 'Project Manager']]
    projects.each { |project| table_data << [project.project_name, project.project_desc, project.project_manager] }
    table_data
  end

  def self.generate_client_table_data(clients)
    table_data = [['Client Name', 'Client Email']]
    clients.each { |client| table_data << [client.name, client.email] }
    table_data
  end

  def self.generate_audit_table_data(audit_histories)
    table_data = [['Date', 'Reviewed By', 'Status', 'Reviewed Section', 'Queries', 'Action Item']]
    audit_histories.each { |audit| table_data << [audit.date, audit.reviewed_by, audit.status, audit.reviewed_section, audit.queries, audit.action_item] }
    table_data
  end

  def self.generate_version_table_data(version_histories)
    table_data = [['Version No', 'Version Type', 'Change', 'Reason', 'Created By', 'Revision Date', 'Approve Date', 'Approved By']]
    version_histories.each { |version| table_data << [version.version_no, version.version_type, version.change, version.reason, version.created_by, version.revision_date, version.approve_date, version.approved_by] }
    table_data
  end

  def self.generate_overview_table_data(overviews)
    table_data = [['Project Overview', 'Purpose', 'Goals', 'Objectives', 'Budget']]
    overviews.each { |overview| table_data << [overview.project_overview, overview.purpose, overview.goals, overview.objectives, overview.budget] }
    table_data
  end

  def self.generate_stakeholder_table_data(stakeholders)
    table_data = [['Title', 'Name', 'Contact']]
    stakeholders.each { |stakeholder| table_data << [stakeholder.title, stakeholder.name, stakeholder.contact] }
    table_data
  end

  def self.generate_risk_profiling_table_data(risk_profilings)
    table_data = [['Risk Type', 'Description', 'Severity', 'Impact', 'Remedial Steps', 'Status', 'Closure Date']]
    risk_profilings.each { |risk_profiling| table_data << [risk_profiling.risk_type, risk_profiling.description, risk_profiling.severity, risk_profiling.impact, risk_profiling.remedial_steps, risk_profiling.status, risk_profiling.closure_date] }
    table_data
  end

  def self.generate_sprint_detail_table_data(sprint_details)
    table_data = [['Sprint', 'Start Date', 'End Date', 'Status', 'Comments']]
    sprint_details.each { |sprint_detail| table_data << [sprint_detail.sprint, sprint_detail.start_date, sprint_detail.end_date, sprint_detail.status, sprint_detail.comments] }
    table_data
  end

  def self.generate_phase_table_data(phases)
    table_data = [['Title', 'Start Date', 'Completion Date', 'Approval Date', 'Status', 'Revised Completion Date', 'Comments']]
    phases.each { |phase| table_data << [phase.title, phase.start_date, phase.completion_date, phase.approval_date, phase.status, phase.revised_completion_date, phase.comments] }
    table_data
  end

  def self.generate_approved_teams_table_data(approved_teams)
    table_data = [['Number of Resources', 'Role', 'Availability Percentage', 'Duration']]
    approved_teams.each { |team| table_data << [team.number_of_resources, team.role, team.availability_percentage, team.duration] }
    table_data
  end

  def self.generate_resources_table_data(resources)
    table_data = [['Resource Name', 'Role', 'Start Date', 'End Date', 'Comment']]
    resources.each { |resource| table_data << [resource.resource_name, resource.role, resource.start_date, resource.end_date, resource.comment] }
    table_data
  end

  def self.generate_client_feedbacks_table_data(client_feedbacks)
    table_data = [['Feedback Type', 'Date Received', 'Detailed Feedback', 'Action Taken', 'Closure Date']]
    client_feedbacks.each { |feedback| table_data << [feedback.feedback_type, feedback.date_received, feedback.detailed_feedback, feedback.action_taken, feedback.closure_date] }
    table_data
  end

  def self.generate_project_updates_table_data(project_updates)
    table_data = [['Date', 'General Updates']]
    project_updates.each { |update| table_data << [update.date, update.general_updates] }
    table_data
  end

  def self.generate_moms_of_client_meetings_table_data(moms_of_client_meetings)
    table_data = [['Date', 'Duration', 'MoM Link', 'Comments']]
    moms_of_client_meetings.each { |mom| table_data << [mom.date, mom.duration, mom.mom_link, mom.comments] }
    table_data
  end


  def self.draw_table(pdf, table_data, title, table_options)
    pdf.text title, align: :center, size: 14, style: :bold
    pdf.table(table_data, table_options) do
      cells.padding = 8
      cells.border_width = 0.5
      row(0).font_style = :bold
      self.cells.border_color = "888888"
    end
    pdf.move_down 20
  end
end
