class Api::V1::RiskProfilingsController < ApplicationController
  before_action :set_project
  before_action :set_risk_profiling, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /risk_profilings
  # def index
  #   @risk_profilings = RiskProfiling.all

  #   render json: @risk_profilings
  # end
  #Get /projects/:project_id/risk_profilings
  def index
    @risk_profilings = @project.risk_profilings
    render json: @risk_profilings
  end

  # GET /risk_profilings/1
  def show
    render json: @risk_profiling
  end

  # POST /risk_profilings
  def create
    @risk_profiling = RiskProfiling.new(risk_profiling_params)

    if @risk_profiling.save
      render json: @risk_profiling, status: :created, location: @risk_profiling
    else
      render json: @risk_profiling.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/risk_profilings
  def create
    @risk_profiling = @project.risk_profilings.new(risk_profiling_params)
    if @risk_profiling.save
      render json: @risk_profiling, status: :created, location: api_v1_project_url(@risk_profiling)
    else
      render json: @risk_profiling.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /risk_profilings/1
  def update
    if @risk_profiling.update(risk_profiling_params)
      render json: @risk_profiling
    else
      render json: @risk_profiling.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/risk_profilings/:id
  def update
    if @risk_profiling.update(risk_profiling_params)
      render json: @risk_profiling
    else
      render json: @risk_profiling.errors, status: :unprocessable_entity
    end
  end

  # DELETE /risk_profilings/1
  # Delete /projects/:project_id/risk_profilings/:id
  def destroy
    @risk_profiling.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_risk_profiling
      @risk_profiling = RiskProfiling.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def risk_profiling_params
      params.require(:risk_profiling).permit(:risk_type, :description, :severity, :impact, :remedial_steps, :status, :closure_date, :project_id)
    end
end
