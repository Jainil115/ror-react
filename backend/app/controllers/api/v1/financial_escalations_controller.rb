class Api::V1::FinancialEscalationsController < ApplicationController
  before_action :set_project
  before_action :set_financial_escalation, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /financial_escalations
  # def index
  #   @financial_escalations = FinancialEscalation.all

  #   render json: @financial_escalations
  # end
  #Get /projects/:project_id/financial_escalations
  def index
    @financial_escalations = @project.financial_escalations
    render json: @financial_escalations
  end

  # GET /financial_escalations/1
  def show
    render json: @financial_escalation
  end

  # POST /financial_escalations
  def create
    @financial_escalation = FinancialEscalation.new(financial_escalation_params)

    if @financial_escalation.save
      render json: @financial_escalation, status: :created, location: @financial_escalation
    else
      render json: @financial_escalation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /financial_escalations/1
  def update
    if @financial_escalation.update(financial_escalation_params)
      render json: @financial_escalation
    else
      render json: @financial_escalation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /financial_escalations/1
  def destroy
    @financial_escalation.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_financial_escalation
      @financial_escalation = FinancialEscalation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def financial_escalation_params
      params.require(:financial_escalation).permit(:escalation_level, :name, :project_id)
    end
end
