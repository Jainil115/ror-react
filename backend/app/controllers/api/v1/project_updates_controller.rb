class Api::V1::ProjectUpdatesController < ApplicationController
  before_action :set_project
  before_action :set_project_update, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /project_updates
  # def index
  #   @project_updates = ProjectUpdate.all

  #   render json: @project_updates
  # end

  #Get /projects/:project_id/project_updates
  def index
    @project_updates = @project.project_updates
    render json: @project_updates
  end

  # GET /project_updates/1
  def show
    render json: @project_update
  end

  # POST /project_updates
  def create
    @project_update = ProjectUpdate.new(project_update_params)

    if @project_update.save
      render json: @project_update, status: :created, location: @project_update
    else
      render json: @project_update.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/project_updates
  def create
    @project_update = @project.project_updates.new(project_update_params)
    if @project_update.save
      render json: @project_update, status: :created, location: api_v1_project_url(@project_update)
    else
      render json: @project_update.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /project_updates/1
  def update
    if @project_update.update(project_update_params)
      render json: @project_update
    else
      render json: @project_update.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/project_updates/:id
  def update
    if @project_update.update(project_update_params)
      render json: @project_update
    else
      render json: @project_update.errors, status: :unprocessable_entity
    end
  end


  # DELETE /project_updates/1
  # DELETE /projects/:project_id/project_updates/:id
  def destroy
    @project_update.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_update
      @project_update = ProjectUpdate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_update_params
      params.require(:project_update).permit(:date, :general_updates, :project_id)
    end
end
