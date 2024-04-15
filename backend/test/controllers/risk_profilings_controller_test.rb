require "test_helper"

class RiskProfilingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @risk_profiling = risk_profilings(:one)
  end

  test "should get index" do
    get risk_profilings_url, as: :json
    assert_response :success
  end

  test "should create risk_profiling" do
    assert_difference("RiskProfiling.count") do
      post risk_profilings_url, params: { risk_profiling: { closure_date: @risk_profiling.closure_date, description: @risk_profiling.description, impact: @risk_profiling.impact, project_id: @risk_profiling.project_id, remedial_steps: @risk_profiling.remedial_steps, risk_type: @risk_profiling.risk_type, severity: @risk_profiling.severity, status: @risk_profiling.status } }, as: :json
    end

    assert_response :created
  end

  test "should show risk_profiling" do
    get risk_profiling_url(@risk_profiling), as: :json
    assert_response :success
  end

  test "should update risk_profiling" do
    patch risk_profiling_url(@risk_profiling), params: { risk_profiling: { closure_date: @risk_profiling.closure_date, description: @risk_profiling.description, impact: @risk_profiling.impact, project_id: @risk_profiling.project_id, remedial_steps: @risk_profiling.remedial_steps, risk_type: @risk_profiling.risk_type, severity: @risk_profiling.severity, status: @risk_profiling.status } }, as: :json
    assert_response :success
  end

  test "should destroy risk_profiling" do
    assert_difference("RiskProfiling.count", -1) do
      delete risk_profiling_url(@risk_profiling), as: :json
    end

    assert_response :no_content
  end
end
