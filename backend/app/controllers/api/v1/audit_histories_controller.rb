class Api::V1::AuditHistoriesController < ApplicationController
  before_action :set_project
  before_action :set_audit_history, only: %i[ show update destroy ]


  def set_project
    @project = Project.find(params[:project_id])
  end


  # GET /audit_histories
  # def index
  #   @audit_histories = AuditHistory.all

  #   render json: @audit_histories
  # end
  
  
# GET /projects/:project_id/audit_histories
  def index
    @audit_histories = @project.audit_histories
    render json: @audit_histories
  end

  # GET /audit_histories/1
  def show
    render json: @audit_history
  end

  # POST /audit_histories
  def create
    @audit_history = AuditHistory.new(audit_history_params)

    if @audit_history.save
      render json: @audit_history, status: :created, location: api_v1_project_url(@audit_history)
    else
      render json: @audit_history.errors, status: :unprocessable_entity
    end
  end

   # POST /projects/:project_id/audit_histories
   def create
    @audit_history = @project.audit_histories.new(audit_history_params)

    if @audit_history.save
      render json: @audit_history, status: :created, location: api_v1_project_url(@audit_history)
    else
      render json: @audit_history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /audit_histories/1
  # def update
  #   if @audit_history.update(audit_history_params)
  #     render json: @audit_history
  #   else
  #     render json: @audit_history.errors, status: :unprocessable_entity
  #   end
  # end
  # PUT /projects/:project_id/audit_histories/:id
  def update
    if @audit_history.update(audit_history_params)
      render json: @audit_history
    else
      render json: @audit_history.errors, status: :unprocessable_entity
    end
  end


# api/v1/projects/${project.id}/audit_histories/${id}
  # DELETE /api/v1/audit_histories/:id
  def destroy
    @audit_history.destroy!
  end
  # DELETE /api/v1/audit_histories/:id
# def destroy
#   @audit_history = AuditHistory.find(params[:id])
#   @audit_history.destroy
#   head :no_content
# end


  private
   
    def set_audit_history
      @audit_history = AuditHistory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def audit_history_params
      params.require(:audit_history).permit(:date, :reviewed_by, :status, :reviewed_section, :queries, :action_item, :project_id)
    end
end
