class Api::V1::ClientFeedbacksController < ApplicationController
  before_action :set_project
  before_action :set_client_feedback, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end


  # GET /client_feedbacks
  # def index
  #   @client_feedbacks = ClientFeedback.all

  #   render json: @client_feedbacks
  # end

  #Get /projects/:project_id/client_feedbacks
  def index
    @client_feedbacks = @project.client_feedbacks
    render json: @client_feedbacks
  end

  # GET /client_feedbacks/1
  def show
    render json: @client_feedback
  end

  # POST /client_feedbacks
  def create
    @client_feedback = ClientFeedback.new(client_feedback_params)

    if @client_feedback.save
      render json: @client_feedback, status: :created, location: @client_feedback
    else
      render json: @client_feedback.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/client_feedbacks
  def create
    @client_feedback = @project.client_feedbacks.new(client_feedback_params)
    if @client_feedback.save
      render json: @client_feedback, status: :created, location: api_v1_project_url(@client_feedback)
    else
      render json: @client_feedback.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /client_feedbacks/1
  def update
    if @client_feedback.update(client_feedback_params)
      render json: @client_feedback
    else
      render json: @client_feedback.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/client_feedbacks/:id
  def update
    if @client_feedback.update(client_feedback_params)
      render json: @client_feedback
    else
      render json: @client_feedback.errors, status: :unprocessable_entity
    end
  end

  # DELETE /client_feedbacks/1
  # DELETE /projects/:project_id/client_feedbacks/:id
  def destroy
    @client_feedback.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_client_feedback
      @client_feedback = ClientFeedback.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def client_feedback_params
      params.require(:client_feedback).permit(:feedback_type, :date_received, :detailed_feedback, :action_taken, :closure_date, :project_id)
    end
end
