class Api::V1::OperationalEscalationsController < ApplicationController
  before_action :set_project
  before_action :set_operational_escalation, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /operational_escalations
  # def index
  #   @operational_escalations = OperationalEscalation.all

  #   render json: @operational_escalations
  # end
  #Get /projects/:project_id/operational_escalations
  def index
    @operational_escalations = @project.operational_escalations
    render json: @operational_escalations
  end

  # GET /operational_escalations/1
  def show
    render json: @operational_escalation
  end

  # POST /operational_escalations
  def create
    @operational_escalation = OperationalEscalation.new(operational_escalation_params)

    if @operational_escalation.save
      render json: @operational_escalation, status: :created, location: @operational_escalation
    else
      render json: @operational_escalation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /operational_escalations/1
  def update
    if @operational_escalation.update(operational_escalation_params)
      render json: @operational_escalation
    else
      render json: @operational_escalation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /operational_escalations/1
  def destroy
    @operational_escalation.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_operational_escalation
      @operational_escalation = OperationalEscalation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def operational_escalation_params
      params.require(:operational_escalation).permit(:escalation_level, :name, :project_id)
    end
end
