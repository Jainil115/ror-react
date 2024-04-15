class Api::V1::TechnicalEscalationsController < ApplicationController
  before_action :set_project
  before_action :set_technical_escalation, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /technical_escalations
  # def index
  #   @technical_escalations = TechnicalEscalation.all

  #   render json: @technical_escalations
  # end

  #Get /projects/:project_id/technical_escalations
  def index
    @technical_escalations = @project.technical_escalations
    render json: @technical_escalations
  end
  # GET /technical_escalations/1
  def show
    render json: @technical_escalation
  end

  # POST /technical_escalations
  def create
    @technical_escalation = TechnicalEscalation.new(technical_escalation_params)

    if @technical_escalation.save
      render json: @technical_escalation, status: :created, location: @technical_escalation
    else
      render json: @technical_escalation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /technical_escalations/1
  def update
    if @technical_escalation.update(technical_escalation_params)
      render json: @technical_escalation
    else
      render json: @technical_escalation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /technical_escalations/1
  def destroy
    @technical_escalation.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_technical_escalation
      @technical_escalation = TechnicalEscalation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def technical_escalation_params
      params.require(:technical_escalation).permit(:escalation_level, :name, :project_id)
    end
end


    