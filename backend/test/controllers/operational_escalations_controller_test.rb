require "test_helper"

class OperationalEscalationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @operational_escalation = operational_escalations(:one)
  end

  test "should get index" do
    get operational_escalations_url, as: :json
    assert_response :success
  end

  test "should create operational_escalation" do
    assert_difference("OperationalEscalation.count") do
      post operational_escalations_url, params: { operational_escalation: { escalation_level: @operational_escalation.escalation_level, name: @operational_escalation.name, project_id: @operational_escalation.project_id } }, as: :json
    end

    assert_response :created
  end

  test "should show operational_escalation" do
    get operational_escalation_url(@operational_escalation), as: :json
    assert_response :success
  end

  test "should update operational_escalation" do
    patch operational_escalation_url(@operational_escalation), params: { operational_escalation: { escalation_level: @operational_escalation.escalation_level, name: @operational_escalation.name, project_id: @operational_escalation.project_id } }, as: :json
    assert_response :success
  end

  test "should destroy operational_escalation" do
    assert_difference("OperationalEscalation.count", -1) do
      delete operational_escalation_url(@operational_escalation), as: :json
    end

    assert_response :no_content
  end
end
