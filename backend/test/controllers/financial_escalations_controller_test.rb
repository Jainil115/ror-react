require "test_helper"

class FinancialEscalationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @financial_escalation = financial_escalations(:one)
  end

  test "should get index" do
    get financial_escalations_url, as: :json
    assert_response :success
  end

  test "should create financial_escalation" do
    assert_difference("FinancialEscalation.count") do
      post financial_escalations_url, params: { financial_escalation: { escalation_level: @financial_escalation.escalation_level, name: @financial_escalation.name, project_id: @financial_escalation.project_id } }, as: :json
    end

    assert_response :created
  end

  test "should show financial_escalation" do
    get financial_escalation_url(@financial_escalation), as: :json
    assert_response :success
  end

  test "should update financial_escalation" do
    patch financial_escalation_url(@financial_escalation), params: { financial_escalation: { escalation_level: @financial_escalation.escalation_level, name: @financial_escalation.name, project_id: @financial_escalation.project_id } }, as: :json
    assert_response :success
  end

  test "should destroy financial_escalation" do
    assert_difference("FinancialEscalation.count", -1) do
      delete financial_escalation_url(@financial_escalation), as: :json
    end

    assert_response :no_content
  end
end
