class Api::V1::PhasesController < ApplicationController
  before_action :set_project
  before_action :set_phase, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /phases
  # def index
  #   @phases = Phase.all

  #   render json: @phases
  # end
  #Get /projects/:project_id/phases
  def index
    @phases = @project.phases
    render json: @phases
  end


  # GET /phases/1
  def show
    render json: @phase
  end

  # POST /phases
  def create
    @phase = Phase.new(phase_params)

    if @phase.save
      render json: @phase, status: :created, location: @phase
    else
      render json: @phase.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/phases
  def create
    @phase = @project.phases.new(phase_params)
    if @phase.save
      render json: @phase, status: :created, location: api_v1_project_url(@phase)
    else
      render json: @phase.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /phases/1
  def update
    if @phase.update(phase_params)
      render json: @phase
    else
      render json: @phase.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/phases/:id
  def update
    if @phase.update(phase_params)
      render json: @phase
    else
      render json: @phase.errors, status: :unprocessable_entity
    end
  end


  # DELETE /phases/1
  # DELETE /projects/:project_id/phases/:id
  def destroy
    @phase.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_phase
      @phase = Phase.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def phase_params
      params.require(:phase).permit(:title, :start_date, :completion_date, :approval_date, :status, :revised_completion_date, :comments, :project_id)
    end
end
